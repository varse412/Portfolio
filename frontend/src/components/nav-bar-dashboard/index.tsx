import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { dashboardScreenName } from "@/pages/profiles-page/types";
import { Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
    CircleUser,
    UserRoundCog,
    Eye,
    CirclePlus,
    FilePenLine,
    Trash2,
    Braces,
    LogOut,
    Settings,
    User,
    BriefcaseBusiness,
    ListChecks
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
const dashboardScreens: JSX.Element[] = Object.values(dashboardScreenName).map((screenName, index) => {
    return (
        <>
            {(index != Object.values(dashboardScreenName).length - 1) ? (<div key={index} className='flex flex-1 m-2'>
                <Link to={`profiles/${screenName}`}>{screenName}</Link>
            </div>) : null}
        </>
    )

});
export function NavbarDashboard() {
    return (
        <Menubar id="navContainer">
            <MenubarMenu>
                <MenubarTrigger>Profiles</MenubarTrigger>
                <MenubarContent>
                    <MenubarSub>
                        <MenubarSubTrigger>Types</MenubarSubTrigger>
                        <MenubarSubContent>
                            <Link to={'profiles/myProfile'}><MenubarItem>{"Profile"}</MenubarItem></Link>
                            <Link to={'profiles/bio'}><MenubarItem>{"Bio"}</MenubarItem></Link>
                        </MenubarSubContent>
                    </MenubarSub>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Work</MenubarTrigger>
                <MenubarContent>
                    <MenubarSub>
                        <MenubarSubTrigger>Projects</MenubarSubTrigger>
                        <MenubarSubContent>
                            <Link to={'profiles/projects'}><MenubarItem>{"View"}</MenubarItem></Link>
                            <Link to={'profiles/projects/add'}><MenubarItem>{"Add"}</MenubarItem></Link>
                            <Link to={'profiles/projects'}><MenubarItem>{"Edit"}</MenubarItem></Link>
                            <Link to={'profiles/projects'}><MenubarItem>{"Delete"}</MenubarItem></Link>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarSub>
                        <MenubarSubTrigger>Certifications</MenubarSubTrigger>
                        <MenubarSubContent>
                            <Link to={'profiles/certifications'}><MenubarItem>{"View"}</MenubarItem></Link>
                            <Link to={'profiles/certifications/add'}><MenubarItem>{"Add"}</MenubarItem></Link>
                            <Link to={'profiles/certifications'}><MenubarItem>{"Edit"}</MenubarItem></Link>
                            <Link to={'profiles/certifications'}><MenubarItem>{"Delete"}</MenubarItem></Link>
                        </MenubarSubContent>
                    </MenubarSub>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Experience</MenubarTrigger>
                <MenubarContent>
                    <MenubarSub>
                        <MenubarSubTrigger>Education</MenubarSubTrigger>
                        <MenubarSubContent>
                            <Link to={'profiles/education'}><MenubarItem>{"View"}</MenubarItem></Link>
                            <Link to={'profiles/education/add'}><MenubarItem>{"Add"}</MenubarItem></Link>
                            <Link to={'profiles/education'}><MenubarItem>{"Edit"}</MenubarItem></Link>
                            <Link to={'profiles/education'}><MenubarItem>{"Delete"}</MenubarItem></Link>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarSub>
                        <MenubarSubTrigger>Work Experience</MenubarSubTrigger>
                        <MenubarSubContent>
                            <Link to={'profiles/workExperience'}><MenubarItem>{"View"}</MenubarItem></Link>
                            <Link to={'profiles/workExperience/add'}><MenubarItem>{"Add"}</MenubarItem></Link>
                            <Link to={'profiles/workExperience'}><MenubarItem>{"Edit"}</MenubarItem></Link>
                            <Link to={'profiles/workExperience'}><MenubarItem>{"Delete"}</MenubarItem></Link>
                        </MenubarSubContent>
                    </MenubarSub>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                {/* <MenubarTrigger>Skills</MenubarTrigger>
                <Link to={'profiles/workExperience'}><MenubarItem>{"Delete"}</MenubarItem></Link> */}
                <MenubarTrigger>Skills</MenubarTrigger>
                <MenubarContent>
                    <Link to={'profiles/skills'}><MenubarItem>{"View"}</MenubarItem></Link>
                    <Link to={'profiles/skills/add'}><MenubarItem>{"Add"}</MenubarItem></Link>
                    <Link to={'profiles/skills'}><MenubarItem>{"Edit"}</MenubarItem></Link>
                    <Link to={'profiles/skills'}><MenubarItem>{"Delete"}</MenubarItem></Link>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}


export function NavbarMenu() {
    return (
        <div id="dropDownMenu">
            <DropdownMenu  >
                <DropdownMenuTrigger asChild >
                    <Button variant="outline" ><Menu /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            {/* <UserPlus className="mr-2 h-4 w-4" /> */}
                                            <span>Types</span>
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <Link to={'profiles/myProfile'}> <DropdownMenuItem>
                                                    <UserRoundCog className="mr-2 h-4 w-4" />
                                                    <span>Profile</span>
                                                </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuSeparator />
                                                <Link to={'profiles/bio'}>
                                                    <DropdownMenuItem>
                                                        <CircleUser className="mr-2 h-4 w-4" />
                                                        <span>Bio</span>
                                                    </DropdownMenuItem>
                                                </Link>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <BriefcaseBusiness className="mr-2 h-4 w-4" />
                                <span>Work</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            <span>Projects</span>
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <Link to={'profiles/projects'}> <DropdownMenuItem>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    <span>View</span>
                                                </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuSeparator />
                                                <Link to={'profiles/projects/add'}> <DropdownMenuItem>
                                                    <CirclePlus className="mr-2 h-4 w-4" />
                                                    <span>Add</span>
                                                </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuSeparator />
                                                <Link to={'profiles/projects'}> <DropdownMenuItem>
                                                    <FilePenLine className="mr-2 h-4 w-4" />
                                                    <span>Edit</span>
                                                </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuSeparator />
                                                <Link to={'profiles/projects'}>
                                                    <DropdownMenuItem>
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        <span>Delete</span>
                                                    </DropdownMenuItem>
                                                </Link>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            <span>Certifications</span>
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <Link to={'profiles/certifications'}> <DropdownMenuItem>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    <span>View</span>
                                                </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuSeparator />
                                                <Link to={'profiles/certifications/add'}> <DropdownMenuItem>
                                                    <CirclePlus className="mr-2 h-4 w-4" />
                                                    <span>Add</span>
                                                </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuSeparator />
                                                <Link to={'profiles/certifications'}> <DropdownMenuItem>
                                                    <FilePenLine className="mr-2 h-4 w-4" />
                                                    <span>Edit</span>
                                                </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuSeparator />
                                                <Link to={'profiles/certifications'}>
                                                    <DropdownMenuItem>
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        <span>Delete</span>
                                                    </DropdownMenuItem>
                                                </Link>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <Braces className="mr-2 h-4 w-4" />
                                <span>Experience</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            <span>Education</span>
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <Link to={'profiles/education'}> <DropdownMenuItem>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    <span>View</span>
                                                </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuSeparator />
                                                <Link to={'profiles/education/add'}> <DropdownMenuItem>
                                                    <CirclePlus className="mr-2 h-4 w-4" />
                                                    <span>Add</span>
                                                </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuSeparator />
                                                <Link to={'profiles/education'}> <DropdownMenuItem>
                                                    <FilePenLine className="mr-2 h-4 w-4" />
                                                    <span>Edit</span>
                                                </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuSeparator />
                                                <Link to={'profiles/education'}>
                                                    <DropdownMenuItem>
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        <span>Delete</span>
                                                    </DropdownMenuItem>
                                                </Link>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            <span>Work Experience</span>
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <Link to={'profiles/workExperience'}> <DropdownMenuItem>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    <span>View</span>
                                                </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuSeparator />
                                                <Link to={'profiles/workExperience/add'}> <DropdownMenuItem>
                                                    <CirclePlus className="mr-2 h-4 w-4" />
                                                    <span>Add</span>
                                                </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuSeparator />
                                                <Link to={'profiles/workExperience'}> <DropdownMenuItem>
                                                    <FilePenLine className="mr-2 h-4 w-4" />
                                                    <span>Edit</span>
                                                </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuSeparator />
                                                <Link to={'profiles/workExperience'}>
                                                    <DropdownMenuItem>
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        <span>Delete</span>
                                                    </DropdownMenuItem>
                                                </Link>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <ListChecks className="mr-2 h-4 w-4" />
                                <span>Skills</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>

                                    <DropdownMenuSub>
                                        <Link to={'profiles/skills'}> <DropdownMenuItem>
                                            <Eye className="mr-2 h-4 w-4" />
                                            <span>View</span>
                                        </DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuSeparator />
                                        <Link to={'profiles/skills/add'}> <DropdownMenuItem>
                                            <CirclePlus className="mr-2 h-4 w-4" />
                                            <span>Add</span>
                                        </DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuSeparator />
                                        <Link to={'profiles/skills'}> <DropdownMenuItem>
                                            <FilePenLine className="mr-2 h-4 w-4" />
                                            <span>Edit</span>
                                        </DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuSeparator />
                                        <Link to={'profiles/skills'}> <DropdownMenuItem>
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            <span>Delete</span>
                                        </DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuSub>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

//view add edit delete icons

{/* <Eye className="mr-2 h-4 w-4"/>
<CirclePlus className="mr-2 h-4 w-4"/>
<FilePenLine className="mr-2 h-4 w-4"/>
 <Trash2 className="mr-2 h-4 w-4"/> */}

export function BioAvatar() {
    return (
        <Link to={`profiles/bio`}>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </Link>
    );
}