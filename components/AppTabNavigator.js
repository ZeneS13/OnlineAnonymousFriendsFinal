import HomeScreen from '../screens/HomeScreen'
import SearchScreen from '../screens/SearchScreen'
import { createBottomTabNavigator } from 'react-navigation-tabs';


const AppTabNavigator= createBottomTabNavigator(
    {
      HomeScreen : {screen:HomeScreen},
      Search : {screen: SearchScreen}
    }
  )

 export default AppTabNavigator; 