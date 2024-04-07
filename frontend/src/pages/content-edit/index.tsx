import { useParams } from 'react-router-dom'
// import getProfile  from './profile'
import { useRouteMatch } from '../../utils/routeMatcher'
import { EachElement } from '../../utils/Each'
import { dashboardScreenName } from '../../pages/profiles-page/types'
import getEditfile from './getcontentfile'
const EditContent: React.FC = () => {
  const { profile } = useParams()
  const { pathname } = useRouteMatch()
  return (
    <>
      {typeof profile === 'string' &&
        <EachElement
          of={Object.values(dashboardScreenName)}
          render={(screenName, index) => {
            if (pathname?.includes(screenName)) {
              const GetEditfile = getEditfile(screenName)
              return (
                <GetEditfile />
              )
            }
          }}
        />}
    </>
  )
}
export default EditContent;
// {Object.values(dashboardScreenName).map((screenName, index) =>{
//   if(pathname?.includes(screenName)){
// const GetEditfile=getEditfile(screenName)
// console.log("index",pathname,"+++++",screenName)
//  return (
//           <GetEditfile/>
//          )
// }
// })}

// { Object.values(dashboardScreenName).map((screenName, index) => {
//   if(pathname?.includes(screenName)){
//     const GetEditfile=getEditfile(screenName)
//       return (
//         <GetEditfile/>
//       )
//  }else{
//   return null;
//  }

// })
// }
// }