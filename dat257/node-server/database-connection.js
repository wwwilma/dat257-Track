// Import the necessary dependency
const { Client } = require("pg");
// Create a new PostgreSQL client with the given configuration
const crateClient = new Client({
    host: "task-database.aks1.westeurope.azure.cratedb.net",
    port: 5432,
    user: "admin",
    password: "o2Ca^KJakCU-er3086t3nciJ",
    ssl: true,
});
// Connect to the CrateDB database
crateClient.connect();
// getUsers function that retrieves users from database
const getUsers = () => {
    return crateClient
        .query("SELECT id, name FROM database.users ORDER BY id;")
        .then((res) => {
            return res.rows;
        })
        .catch((err) => {
            console.error(err);
            crateClient.end();
        });
};
// getUserName function that retrieves a users name from database
const getUserName = (userId) => {
    return crateClient
        .query(`SELECT name FROM database.users WHERE id = ${userId};`)
        .then((res) => {
            return res.rows;
        })
        .catch((err) => {
            console.error(err);
            crateClient.end();
        });
};
// getAllHabits function that retrieves all habits from the database.
const getAllHabits = () => {
    return crateClient
        .query(`SELECT id, name, description FROM database.habits ORDER BY id;`)
        .then((res) => {
            return res.rows;
        })
        .catch((err) => {
            console.error(err);
            crateClient.end();
        });
};
// getTimesDone function that retrieves how many times a card is clicked on a specific date, user and habit.
const getTimesDone = (userId, habitId) => {
    return crateClient
        .query(`SELECT counter FROM database.trackers WHERE userid = ${userId} AND habitid = ${habitId} AND date= CURRENT_DATE;`)
        .then((res) => {
            return res.rows;
        })
        .catch((err) => {
            console.error(err);
            crateClient.end();
        });
};
// incrementTimesDone function that sets the counter to a number.
const incrementTimesDone = (userId, habitId, nr) => {
    return crateClient
        .query(`UPDATE database.trackers SET counter = ${nr} WHERE userid = ${userId} AND habitid = ${habitId} AND date = CURRENT_DATE;`)
        .catch((err) => {
            console.error(err);
            crateClient.end();
        });
};

// getFavoriteHabits function that retrieves all favorite habits for a specific user from the database.
const getFavoriteHabits = (userId) => {
    return crateClient
        .query(`SELECT h.id, h.name, h.description
                FROM database.habits h
                WHERE EXISTS(
                        SELECT 1
                        FROM database.trackers t
                        WHERE t.userid = ${userId}
                          AND t.habitid = h.id
                          AND t.date = CURRENT_DATE
                    )
                  AND EXISTS(
                        SELECT 2
                        FROM database.FavoriteHabits f
                        WHERE f.userid = ${userId}
                          AND f.habitid = h.id
                          AND f.favorite = true
                    )
                ORDER BY h.id;`)
        .then((res) => {
            return res.rows;
        })
        .catch((err) => {
            console.error(err);
            crateClient.end();
        });
}


// getStatistics function that retrieves statistics from database
const getStatistics = (userId) => {
    return crateClient
        .query(`SELECT DATE_FORMAT('%Y/%m/%d',date) AS date, sum(counter) as counter FROM database.trackers WHERE userid = ${userId} GROUP BY date ORDER BY date;`)
        .then((res) => {
            return res.rows;
        })
        .catch((err) => {
            console.error(err);
            crateClient.end();
        });
};

// setFavoriteHabit function that sets favorite to true or false
const setFavoriteHabit = (userId, habitId, favorite) => {
    return crateClient
        .query(`UPDATE database.favoritehabits SET favorite = ${favorite} WHERE userid = ${userId} AND habitid = ${habitId};`)
        .catch((err) => {
            console.error(err);
            crateClient.end();
        });
};

//customQuery takes in query and sends it to the database
const customQuery = (query) => {
    return crateClient
        .query(`${query}`)
        .catch((err) => {
            console.error(err);
            crateClient.end();
        });
};




// Export the functions, so they can be used by other modules
module.exports = {
    getUsers: getUsers,
    getUserName: getUserName,
    getStatistics: getStatistics,
    getAllHabits: getAllHabits,
    getTimesDone: getTimesDone,
    incrementTimesDone: incrementTimesDone,
    getFavoriteHabits: getFavoriteHabits,
    setFavoriteHabit: setFavoriteHabit,
    customQuery: customQuery,
};
