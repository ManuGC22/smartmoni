import { Box, DisplayText, Button, Icon } from "@/UI/Atoms";
import { I18nContext, AuthContext } from "@/Contexts";
const Login = () => {
  const { t } = I18nContext.useLocalization();
  const { login, loading } = AuthContext.useAuth();

  return (
    <Box
      backgroundColor={"primary"}
      flex={1}
      alignItems={"center"}
      justifyContent={"center"}
      rowGap={"xxl"}
    >
      <Box rowGap={"xxl"} paddingHorizontal={"l"} marginBottom={"xxl"}>
        <Box flexDirection={"row"}>
          <DisplayText variant={"heading"} color="white">
            Smart
          </DisplayText>
          <DisplayText variant={"heading"} color="carrot">
            Moni
          </DisplayText>
        </Box>
        <Box paddingRight={"s"}>
          <DisplayText color={"textSecondary"}>
            {t("Login.message")}
          </DisplayText>
        </Box>
      </Box>

      <Box>
        <Button
          mode="contained"
          textColor="white"
          backgroundColor="carrot"
          icon={() => <Icon name="Google" color="white" />}
          onPress={login}
          disabled={loading}
        >
          {t("Login.google")}
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
