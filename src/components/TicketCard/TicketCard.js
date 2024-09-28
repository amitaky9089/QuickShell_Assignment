import './TicketCard.css'; // Import the CSS file

//SingleCard → TicketCard
const TicketCard = ({ title, ticketId, group, priorityLevels, userObj, statusObj, status, user, priority }) => {
  return (
    <div className="card-container">
      <div className="card-header">
        <span>{ticketId}</span>
        {group !== "user" && <img src={userObj[user].path} alt="user" />}
      </div>
      <div className="card-body">
        {group !== "status" && <img src={statusObj[status].path} alt="status" />}
        <h5>{title}</h5>
      </div>
      <div className="card-footer">
        {group !== "priority" && <img src={priorityLevels[priority].path} alt="priority" />}
        <span>Feature Request</span>
      </div>
    </div>
  );
};

export default TicketCard;
