import React, { useEffect} from "react";
import { ToggleLink } from "../ToggleLink";
import { useSelector } from "react-redux";
import { categoriesSelector } from "../modules/loadData/selectors";
import { fetchCategories } from "../modules/loadData/categoriesSlice";
import { AppDispatch, useAppDispatch } from "../store";

type CategoryNavigationProps = {
    baseUrl: string
}

export const CategoryNavigation: React.FC<CategoryNavigationProps> = ({baseUrl}) => {
    const dispatch: AppDispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(fetchCategories());
    },[dispatch]);

    const categories = useSelector(categoriesSelector);

    return <>
        <ToggleLink className="btn btn-secondary btn-block" to={ baseUrl } exact={ true }>All</ToggleLink>

        { categories && categories.map(cat =>
            <ToggleLink key={ cat } to={ `${baseUrl}/${cat.toLowerCase()}`}>
                { cat }
            </ToggleLink>
        )}
    </>
}