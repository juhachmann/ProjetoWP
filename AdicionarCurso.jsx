import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; 
import {styles} from './styles';


const AdicionarCurso = ({ navigation }) => {

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [publico, setPublico] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [local, setLocal] = useState('');
    const [imagens, setImagens] = useState(null);

    const selecionarImagem = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
        if (response.didCancel) {
            alert('Imagem não selecionada');
        } else if (response.errorCode) {
            alert('Erro ao selecionar imagem:', response.errorCode);
        } else {
            setImagens(response.assets[0].uri);
        }
        });
    };

    const handleDataInicioChange = (event, selectedDate) => {
        const currentDate = selectedDate || dataInicio;
        setDataInicio(currentDate);
    };

    const handleDataFimChange = (event, selectedDate) => {
        const currentDate = selectedDate || dataFim;
        setDataFim(currentDate);
    };

    const adicionarPost = async () => {
        const postData = {
        title: titulo,
        content: descricao,
        status: 'publish',
        fields: {
            titulo,
            local,
            descricao,
            publico,
            data_inicio: dataInicio,
            data_fim: dataFim,
            imagens
        },
        tags: ['curso'],
        };

        try {
        const response = await fetch('https://seusite.com.br/wp-json/wp/v2/posts', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer TOKEN',
            },
            body: JSON.stringify(postData),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Post adicionado com sucesso!', data);
            alert('Curso adicionado!');
            navigation.goBack(); 
        } else {
            console.log('Erro ao adicionar o post:', data);
            alert('Erro ao adicionar o curso');
        }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro na conexão');
        }
    };

    return (
        <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Adicionar Curso</Text>

        <View style={styles.form}>
            <TextInput
            style={styles.input}
            placeholder="Título"
            value={titulo}
            onChangeText={setTitulo}
            />
            <TextInput
            style={styles.input}
            placeholder="Ano"
            value={ano}
            onChangeText={setAno}
            />
            <TextInput
            style={styles.input}
            placeholder="Local"
            value={local}
            onChangeText={setLocal}
            />
            <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={descricao}
            onChangeText={setDescricao}
            />
            <TextInput
            style={styles.input}
            placeholder="Público"
            value={publico}
            onChangeText={setPublico}
            />
            <Text style={styles.label}>Data Início</Text>
            <TextInput
            style={styles.input}
            placeholder="Data de Início"
            value={dataInicio}
            onFocus={() => {
                if (Platform.OS === 'android') {
                DatePickerAndroid.open({ date: new Date() })
                    .then((res) => handleDataInicioChange(null, res.date))
                    .catch((error) => alert(error));
                }
            }}
            />

            <Text style={styles.label}>Data Fim</Text>
            <TextInput
            style={styles.input}
            placeholder="Data de Fim"
            value={dataFim}
            onFocus={() => {
                if (Platform.OS === 'android') {
                DatePickerAndroid.open({ date: new Date() })
                    .then((res) => handleDataFimChange(null, res.date))
                    .catch((error) => alert(error));
                }
            }}
            />

            <TouchableOpacity style={styles.imageButton} onPress={selecionarImagem}>
            <Text style={styles.imageButtonText}>Escolher Imagem</Text>
            </TouchableOpacity>
            {imagens && <Text style={styles.imageText}>Imagem selecionada: {imagens}</Text>}
        </View>

        <Button title="Confirmar" onPress={adicionarPost} />
        </View>
    );
};


export default AdicionarCurso;
