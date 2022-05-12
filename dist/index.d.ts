import React from "react";
import "./styles.css";
declare type RenderTruncator = ({ hiddenItemsCount, }: {
    hiddenItemsCount: number;
}) => React.ReactNode;
interface Props {
    renderTruncator: RenderTruncator;
    children?: React.ReactNode;
    alwaysShowTruncator?: boolean;
    alwaysShowFirst?: boolean;
    className?: string;
    itemClassName?: string;
    truncatorClassName?: string;
    style?: React.CSSProperties;
}
declare const TruncatedList: ({ renderTruncator, alwaysShowTruncator, alwaysShowFirst, children, className, itemClassName, truncatorClassName, style, }: Props) => JSX.Element;
export default TruncatedList;
