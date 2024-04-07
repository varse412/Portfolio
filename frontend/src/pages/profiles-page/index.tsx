import { useParams } from 'react-router-dom'
import getProfile  from './profile'
const Profiles: React.FC = () => {
    const { profile } = useParams()
    console.log(profile)
    const GetProfile =getProfile(profile)
    return (<>
            {typeof profile === 'string' && (
                    <GetProfile/>
            )}
            </>
    )
}
export default Profiles;