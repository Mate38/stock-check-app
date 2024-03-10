import NetInfo from '@react-native-community/netinfo';

export const checkConnection = async (): Promise<boolean> => {    
  const state = await NetInfo.fetch();
  return state.isConnected && state.isInternetReachable ? true : false;
};
