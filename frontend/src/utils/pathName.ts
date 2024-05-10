import { useLocation } from "react-router-dom";
export function getPathName(): string {
    const location = useLocation();
    if (location?.pathname?.endsWith("add")) {
        return "add";
    } else {
        const idusedArray = location?.pathname?.split("/")
        const idused = idusedArray[idusedArray.length - 1]
        return idused;
    }
}