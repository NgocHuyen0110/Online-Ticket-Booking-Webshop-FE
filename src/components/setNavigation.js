var navigation = [];
const setNavigation = (role) => {
  console.log("Role in Set Navigation: " + role);
  if (!role) {
    navigation = [
      {
        id: 1,
        path: "/Login",
        text: "Login",
      }
    ];
  } else {
    switch (role[0]) {
      case "ADMIN":
        navigation = [
          {
            id: 1,
            path: "/Museum",
            text: "Museums",
          },
          {
            id: 2,
            path: "/CreateMuseum",
            text: "CreatMuseum",
          },
          {
            id: 3,
            path: "/CreateTicket",
            text: "Create Ticket",
          },
     
          {
            id: 4,
            path: "/Statistic",
            text: "Statistics",
          },
          {
            id: 5,
            path: "/Login",
            text: "Account",
          }
        
        ];
        break;

      case "CUSTOMER":
        navigation = [
          {
            id: 1,
            path: "/Museum",
            text: "Museums",
          },
          {
            id: 2,
            path: "/Notification",
            text: "Notification",
          },
          {
            id: 3,
            path: "/Order",
            text: "OrderPage",
          },
          {
            id: 4,
            path: "/Login",
            text: "Account",
          },
        ];
        break;

     

      default:
        navigation = [
          
          {
            id: 1,
            path: "/Login",
            text: "Login",
          }
        ];
    }
  }
  return navigation;
};

export default setNavigation;