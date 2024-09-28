import './TaskBoard.css'; // Import the CSS file
import TicketColumn from "../TicketColumn/TicketColumn";

//Main → TaskBoard
const TaskBoard = ({ order, group, data, priorityLevels, userObj, statusObj }) => {
  
  // Function to group tickets based on the provided groupBy (status,priority,user) value
  const categorizeTickets = (tickets, groupBy) => {

    const availableGroups = {
      status: ["Todo", "In progress", "Backlog", "Cancelled", "Done"],
      priority: [4, 3, 2, 1, 0],
      user: ["usr-1", "usr-2", "usr-3", "usr-4", "usr-5"]
    };

    // making an empty array corresponding to all key of a partcular selected group 
    //acc contains data in the form of array for each key in a groupby techinque.
    // and acc will look like same as availableGroups

    const acc = {};
    availableGroups[groupBy].forEach(key => {
      acc[key] = [];
    });

    //pushing tickets corresponding to acc-keys
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
//till now grouping is done.

const sorter=(a,b,type)=>{// a and b are corresponding tickets
    if(type==="title")
        return a.title.localeCompare(b.title);//sorting based on alphabets
    else return b.priority - a.priority;//sorting in descending order
}

//passing grouped tickets and the order in which we want to sort the groupedTickets.
const sortedCategorizeTickets = (groupedTickets,order) => {
    return Object.entries(groupedTickets).reduce((acc, [key, tickets]) => {
        const sortedTickets = tickets.sort((a, b) => sorter(a,b,order));
        acc[key] = sortedTickets;
        return acc;
    }, {});
};


  // Function that calls grouping and sorting functions
  const invokerFunction = (order, group, tickets) => {
    const groupedTickets = categorizeTickets(data.tickets, group);//groups the data
    return sortedCategorizeTickets(groupedTickets, order);//sort the data according to group
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
