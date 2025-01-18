import NavbarContainer from "../containers/NavbarContainer";
import GroupIcon from "@mui/icons-material/Group";
import AssessmentIcon from "@mui/icons-material/Assessment";
import OverviewContainer from "../containers/OverviewContainer";
import ProtectedRoute from "./ProtectedRoute";
import WithdrawListContainer from "../containers/WithdrawListContainer";
import CreateWithdrawContainer from "../containers/CreateWithdrawContainer";
import AddIcon from "@mui/icons-material/Add";
import LoginContainer from "../containers/LoginContainer";
export const MainRoutes = [
  {
    name: "Withdraw List",
    type: "label",
    access: "ADMIN",
    element: (
      <ProtectedRoute>
        <NavbarContainer />
      </ProtectedRoute>
    ),
    icon: <GroupIcon />,
    divider: true,
    children: [
      {
        path: "/",
        element: <WithdrawListContainer />,
      },
    ],
  },
  // {
  //   name: "Overview",
  //   type: "label",
  //   access: "ADMIN",
  //   element: (
  //     <ProtectedRoute>
  //       <NavbarContainer />
  //     </ProtectedRoute>
  //   ),
  //   icon: <AssessmentIcon />,
  //   divider: true,
  //   children: [
  //     {
  //       path: "/",
  //       element: <OverviewContainer />,
  //     },
  //   ],
  // },
  {
    name: "Create Withdraw",
    type: "label",
    access: "ADMIN",
    element: (
      <ProtectedRoute>
        <NavbarContainer />
      </ProtectedRoute>
    ),
    icon: <AddIcon />,
    divider: true,
    children: [
      {
        path: "/create-withdraw",
        element: <CreateWithdrawContainer />,
      },
    ],
  },

  {
    type: "route",
    children: [
      {
        path: "/login",
        element: <LoginContainer />,
      },
    ],
  },
];
