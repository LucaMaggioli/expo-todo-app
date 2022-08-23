import { Text, View } from 'react-native';
import { basicStyles } from '../Styles/Styles';


export default function TodoPage() {
    return(<View>
        <Text style={basicStyles.baseText}>Basic Text</Text>
        <Text style={basicStyles.warningText}>Warning Text</Text>
    </View>)
}