import Mixins from "@/Core/Mixins";
import { FlatList, FlatListProps, RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import OverlayLoader from "../OverlayLoader";
import { useCallback } from "react";

type Item = {
  id: string;
  [key: string]: any;
};

export interface IListProps<T> extends FlatListProps<T> {
  data: T[];
  loading?: boolean;
  onRefresh?: () => void;
}

const List = <T extends Item>({
  data,
  loading,
  ListEmptyComponent,
  onRefresh,
  ...props
}: IListProps<T>) => {
  const insets = useSafeAreaInsets();

  const renderLoadingState = useCallback(() => {
    return <OverlayLoader mode="component" isLoading />;
  }, []);

  return (
    <FlatList
      {...props}
      data={data}
      contentContainerStyle={{
        paddingBottom: Mixins.s(16 + insets.bottom),
        paddingHorizontal: Mixins.s(16),
        rowGap: Mixins.s(12),
        ...(!data.length ? { flex: 1 } : {}),
      }}
      refreshControl={
        <RefreshControl refreshing={loading || false} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        loading && !data.length ? renderLoadingState : ListEmptyComponent
      }
      keyExtractor={(item) => item.id}
    />
  );
};

export default List;
