import './TicketColumn.css'; // Import the CSS file
import Adder from "../../icons_FEtask/add.svg";
import Dotter from "../../icons_FEtask/3 dot menu.svg";
import TicketCard from '../TicketCard/TicketCard';

//ColumnMaker → TicketColumn
const TicketColumn = ({ tickets, keya, priorityLevels, group, order, userObj, statusObj }) => {
  return (
    <div className="column-container">
      <ul className="column-list">
        <div className="column-header">
          <div className="column-header-content">
            {group === "priority" && (
              <div className="priority-group">
                <img src={priorityLevels[keya].path} alt="priority" />
                <h4>{priorityLevels[keya].type}</h4>
              </div>
            )}

            {group === "user" && (
              <div className="user-group">
                <img src={userObj[keya].path} alt="user" />
                <h4>{userObj[keya].name}</h4>
              </div>
            )}

            {group === "status" && (
              <div className="status-group">
                <img src={statusObj[keya].path} alt="status" />
                <h4>{statusObj[keya].name}</h4>
              </div>
            )}
            <p className="ticket-count">{tickets.length}</p>
          </div>
          <div className="column-icons">
            <img src={Adder} alt="add" />
            <img src={Dotter} alt="dropdown" />
          </div>
        </div>

        {tickets.map(ticket => (
          <TicketCard
            key={ticket.id}
            title={ticket.title}
            ticketId={ticket.id}
            user={ticket.userId}
            status={ticket.status}
            priority={ticket.priority}
            priorityLevels={priorityLevels}
            group={group}
            order={order}
            userObj={userObj}
            statusObj={statusObj}
          />
        ))}
      </ul>
    </div>
  );
};

export default TicketColumn;
