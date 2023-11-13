import React from "react";
import { Route, Link } from "react-router-dom";

type ToggleLinkProps = {
    to: string
    exact?: boolean
    className?: string
    activeClass?: string
    inActiveClass?: string
    children: React.ReactNode
}

export const ToggleLink: React.FC<ToggleLinkProps> = (props) => {
    const {to, exact, className, activeClass, inActiveClass, children} = props;

    return (
        <Route path={ to } exact={ exact }
        children={ routeProps => {
            const baseClasses = className || "btn btn-block";
            const activeclass = activeClass || "btn-primary";
            const inActiveclass = inActiveClass || "btn-secondary";
            const combinedClasses =`${baseClasses} ${routeProps.match ? activeclass : inActiveclass}`;

            return <Link to={ to } className={ combinedClasses }>
                { children }
            </Link>
        }} />
    )
}