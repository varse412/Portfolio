import { useParams } from 'react-router-dom'
import getProfile  from './profile'
const Profiles: React.FC = () => {
    const { profile } = useParams()
    console.log("parammmms", typeof profile)
    // const profile="skills";
    console.log("profile ji ",getProfile(profile));
    const GetProfile1 =getProfile(profile)
    return (
        <div className="flex-1 bg-orange-400">
            {typeof profile === 'string' && (
                <div className='w-96 min-h-72 bg-gray-300'>
                    <GetProfile1/>
                </div>
            )}
        </div>
    )
}
export default Profiles;