import React from "react";
import { View, Text } from "react-native";
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Home from "./Home";
import CalendarScreen from "./CalendarScreen";
import AgendaScreen from "./AgendaScreen";
import LoginScreen from "./LoginScreen";
import CustomDrawerContent from "../components/CustomDrawerContent";
import ExercisesScreen from "./ExercisesScreen";

const Drawer = createDrawerNavigator();

// Add the drawer screen for the screen here, then go to CustomDrawerContent and add it there as a DrawerItem component
const Sidebar = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen key="Home" name="Home" component={Home} />
      <Drawer.Screen
        key="Calendar"
        name="Calendar"
        component={CalendarScreen}
      />
      <Drawer.Screen key="Agenda" name="Agenda" component={AgendaScreen} />
      <Drawer.Screen
        key="Exercises"
        name="Exercises"
        component={ExercisesScreen}
      />
    </Drawer.Navigator>
  );
};

export default Sidebar;
