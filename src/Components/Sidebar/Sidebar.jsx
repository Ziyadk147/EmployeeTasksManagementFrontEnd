import {useState} from "react";
import {Sidebar , Button , Menubar} from "primereact"
import useLoginAction from "../../Redux/Login/LoginActionHook.js";
import {useNavigate} from "react-router";
const SidebarComponent = () => {
    const [visible, setVisible] = useState(false);
    const { logout } = useLoginAction();
    const navigate = useNavigate();
    const items = [
        { label: 'Home', icon: 'pi pi-home', command: () => navigate('/') },
        { label: 'Employees', icon: 'pi pi-users', command: () => navigate('/employees/index') },
        { label: 'Kanban Board', icon: 'pi pi-calendar-times', command: () => navigate('/') },
        { label: 'Logout', icon: 'pi pi-sign-out', command: () => logout() },
    ];

    return (
        <Sidebar
            visible={true}
            onHide={() => setVisible(false)}
            className=""
            modal={false} // No modal behavior, the background will not be dimmed
            showCloseIcon={false} // No close icon inside sidebar
        >
            <div className="sidebar-header">
                <h2 className="sidebar-title text-center">Employee Task Management</h2>
            </div>

            <div className="flex flex-column sidebar-content ">
                {items && items.map((item , index) => (
                    <Button
                        label={item.label}
                        icon={item.icon}
                        key={index}
                        className="p-button sidebar-button my-2"
                        onClick={item.command}
                    />

                ))}
            </div>
        </Sidebar>


    );
}
export default SidebarComponent