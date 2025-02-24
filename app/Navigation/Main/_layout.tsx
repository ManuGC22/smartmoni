import { Tabs } from "expo-router";
import { Icon, DisplayText, Box } from "@/UI/Atoms";
import { useRestyleTheme } from "@/Hooks";

export default function MainLayout() {
  const { getColor } = useRestyleTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitle: () => (
          <Box flexDirection={"row"}>
            <DisplayText variant={"subTitleBold"} color="white">
              Smart
            </DisplayText>
            <DisplayText variant={"subTitleBold"} color="carrot">
              Moni
            </DisplayText>
          </Box>
        ),
        headerStyle: {
          backgroundColor: getColor("primary"),
        },
        tabBarActiveTintColor: getColor("carrot"),
        tabBarInactiveTintColor: getColor("textPrimary"),
      }}
    >
      <Tabs.Screen
        name="AccountsMain"
        options={{
          title: "Cuentas",
          tabBarLabel: "Cuentas",
          tabBarIcon: ({ focused, size }) => (
            <Icon
              name="Home"
              size={size}
              color={focused ? "carrot" : "textPrimary"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="AccountTransfers"
        options={{
          title: "Transferencias",
          tabBarLabel: "Transferencias",
          tabBarIcon: ({ focused, size }) => (
            <Icon
              name="Swap"
              size={size}
              color={focused ? "carrot" : "textPrimary"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="AccountDetail/[id]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="AccountSelect"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
