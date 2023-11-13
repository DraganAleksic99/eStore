import React from "react";
import { ToggleLink } from "../ToggleLink";
import { useSelector } from "react-redux";
import { categoriesSelector } from "../modules/loadData/selectors";

type CategoryNavigationProps = {
    baseUrl: string
}

export const CategoryNavigation: React.FC<CategoryNavigationProps> = ({baseUrl}) => {
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