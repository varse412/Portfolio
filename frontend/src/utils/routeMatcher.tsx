import { useLocation } from 'react-router-dom';

export const useRouteMatch = () => {
    const location = useLocation();
    const { pathname } = location;
    const parentPath = pathname.split('/').slice(0, -1).join('/'); // Get the parent path dynamically
    const match=(pathname.split('/').length == 3)&&(pathname !=parentPath);
    const id=pathname.split('/')[3];
    return {match,id,pathname};
};