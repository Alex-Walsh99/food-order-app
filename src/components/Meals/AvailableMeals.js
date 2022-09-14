import classes from './AvailableMeals.module.css'
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import useHttp from "../../hooks/use-http";
import {useEffect, useState} from "react";

const AvailableMeals = () => {

    const [meals, setMeals] = useState([]);
    const {isLoading, error, sendRequest: fetchMeals} = useHttp();

    useEffect(() => {
        const transformMeals = mealsObj => {
            const loadedMeals = [];

            for (const mealKey in mealsObj) {
                loadedMeals.push({
                    id: mealKey,
                    key: mealKey,
                    name: mealsObj[mealKey].name,
                    description: mealsObj[mealKey].description,
                    price: mealsObj[mealKey].price
                });
            }

            setMeals(loadedMeals);
        };

        fetchMeals({url: 'https://react-http-2480d-default-rtdb.firebaseio.com/meals.json'}, transformMeals);

    }, [fetchMeals]);

    let mealList = <h2>no meals found.</h2>

    if(meals.length > 0) {
        mealList = meals.map(meal => (
            <MealItem
                id={meal.id}
                key={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
            />
        ));
    }

    let content = mealList;

    if(error){
        content = <button onClick={fetchMeals}>Try again</button>;
    }
    if(isLoading){
        content = 'Loading meals...';
    }

    return <section className={classes.meals}>
        <Card>
            <ul>
                {content}
            </ul>
        </Card>
    </section>
}

export default AvailableMeals