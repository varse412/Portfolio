

type projectsWidgetProps ={
  imgSrc: string;
  projectName: string;
}
const ProjectsWidget: React.FC = (props:projectsWidgetProps) => {
   
    return (
        <div className="bg-orange-50 w-40 h-40">
          <img src={props?.imgSrc} alt="alternatetext" className="w-4 h-2"></img>
          <text>{props?.projectName}</text>
        </div>
    )
}
export default ProjectsWidget;