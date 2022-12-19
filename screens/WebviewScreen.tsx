
import { WebView } from 'react-native-webview';

export const WebviewScreen = (props) => {
  console.log(props.route.params)
  return (
    <WebView source={{uri: props.route.params.url}} />
  )
}