import React, { useEffect, useState } from "react";
import Card from "./Card";
import "../css/Card.css";
import axios from "axios";

export default function CardGridFavorite({ user }) { // Destructure the prop correctly

    const [habits, setHabits] = useState(null);
    //get all habits from the db and set the constant.
    useEffect(() => {
        axios.get(`http://localhost:3001/favoritehabits/${user}`)
            .then(response => {
                setHabits(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className={"container"}>
            {habits && habits.map(habit => (
                <Card
                    key={habit.id}
                    title={habit.name}
                    desc={habit.description}
                    imgSrc={require(`../img/${habit.id.toString()}.svg`)}
                    habitId={habit.id}
                    user={user}
                />
            ))}
        </div>
    );
}
