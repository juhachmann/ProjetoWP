import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    backButton: {
        marginTop: 10,
    },
    backText: {
        fontSize: 18,
        color: '#FFEB3B',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    form: {
        marginVertical: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
        borderRadius: 5,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#333',
    },
    imageButton: {
        backgroundColor: '#FFEB3B',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageButtonText: {
        fontSize: 16,
        color: '#333',
    },
    imageText: {
        color: '#333',
        marginTop: 10,
    },

});

export default styles;