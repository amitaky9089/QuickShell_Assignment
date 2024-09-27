import './TaskBoard.css'; // Import the CSS file
import TicketColumn from "../TicketColumn/TicketColumn";

const TaskBoard = ({ order, group, data, priorityLevels, userObj, statusObj }) => {
  
  // Function to group tickets based on the provided groupBy value
  const categorizeTickets = (tickets, groupBy) => {
    const availableGroups = {
      status: ["Todo", "In progress", "Backlog", "Cancelled", "Done"],
      priority: [4, 3, 2, 1, 0],
      user: ["usr-1", "usr-2", "usr-3", "usr-4", "usr-5"]
    };

    const acc = {};
    availableGroups[groupBy].forEach(key => {
      acc[key] = [];
    });

    tickets.forEach(ticket => {
      let key = ticket.status;
      if (groupBy === "priority") key = ticket.priority;
      else if (groupBy === "user") key = ticket.userId;
      if (acc[key]) {
        acc[key].push(ticket);
      }
    });

    return acc;
  };

  const sorter=(a,b,type)=>{
    if(type==="title")
        return a.title.localeCompare(b.title);
    else return b.priority - a.priority;
}
const sortedCategorizeTickets = (groupedTickets,order) => {
    return Object.entries(groupedTickets).reduce((acc, [key, tickets]) => {
        const sortedTickets = tickets.sort((a, b) => sorter(a,b,order));
        acc[key] = sortedTickets;
        return acc;
    }, {});
};


  // Function that calls grouping and sorting functions
  const invokerFunction = (order, group, tickets) => {
    const groupedTickets = categorizeTickets(data.tickets, group);
    return sortedCategorizeTickets(groupedTickets, order);
  };

  // Get sorted tickets based on order and group
  const sortedTickets = invokerFunction(order, group, data.tickets);

  // Render the grouped and sorted tickets using the TicketColumn component
  return (
    <div className="main-container">
      {Object.entries(sortedTickets).map(([key, tickets]) => (
        <TicketColumn
          keya={key}
          tickets={tickets}
          priorityLevels={priorityLevels}
          group={group}
          order={order}
          userObj={userObj}
          statusObj={statusObj}
        />
      ))}
    </div>
  );
};

export default TaskBoard;
