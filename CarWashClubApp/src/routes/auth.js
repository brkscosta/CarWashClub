import React from "react";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import { createStackNavigator } from "@react-navigation/stack";

const AuthStack = createStackNavigator();

const AuthRoutes = () => {
  return (
    <>
      <AuthStack.Navigator>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Register" component={Register} />
      </AuthStack.Navigator>
    </>
  );
};

export default AuthRoutes;
