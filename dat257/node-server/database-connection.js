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

const getFavoriteHabits = (userId) => {
    return crateClient
        .query(`SELECT database.Habits.id, database.Habits.name, database.Habits.description
                FROM database.habits
                WHERE EXISTS(
                        select 1
                        FROM database.trackers
                        where database.trackers.userid = ${userId}
                          and database.trackers.date = CURRENT_DATE)
                  AND EXISTS(
                        select 1
                        from database.FavoriteHabits
                        WHERE database.FavoriteHabits.userid = ${userId}
                          AND database.FavoriteHabits.Favorite = true)
                order by id`)
        .then((res) => {
            return res.rows;
        })
        .catch((err) => {
            console.error(err);
            crateClient.end();
        });
};

const setFavoriteHabit = (userId, habitId, boolean) => {
    return crateClient
        .query(`UPDATE database.favoritehabits SET database.favoritehabits.favorite = ${boolean} WHERE userid = ${userId} AND habitid = ${habitId};`)
        .catch((err) => {
            console.error(err);
            crateClient.end();
        });
};



// Export the functions, so they can be used by other modules
module.exports = {
    getUsers: getUsers,
    getUserName: getUserName,
    getAllHabits: getAllHabits,
    getTimesDone: getTimesDone,
    incrementTimesDone: incrementTimesDone,
    getFavoriteHabits: getFavoriteHabits,
    setFavoriteHabit, setFavoriteHabit,
};
