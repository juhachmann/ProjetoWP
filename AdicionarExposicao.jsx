import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import {styles} from './styles';


const AdicionarExposicao = ({ navigation }) => {

    const [titulo, setTitulo] = useState('');
    const [ano, setAno] = useState('');
    const [descricao, setDescricao] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [local, setLocal] = useState('');
    const [imagens, setImagens] = useState(null);

    const selecionarImagem = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('Imagem não selecionada');
            } else if (response.errorCode) {
                console.log('Erro ao selecionar imagem:', response.errorCode);
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
            ano,
            titulo, 
            descricao,
            local,
            data_inicio: dataInicio,
            data_fim: dataFim,
            imagens
        },
        tags: ['exposicao'],
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
                alert('Exposição adicionada!');
                navigation.goBack(); 
            } else {
                console.log('Erro ao adicionar o post:', data);
                alert('Erro ao adicionar a exposição');
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

            <Text style={styles.title}>Adicionar Exposição</Text>

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

                <Text style={styles.label}>Data Início</Text>
                <TextInput
                style={styles.input}
                placeholder="Selecione a Data Início"
                value={dataInicio}
                onFocus={() => {
                    if (Platform.OS === 'android') {
                    DatePickerAndroid.open({ date: new Date() })
                        .then((res) => handleDataInicioChange(null, res.date))
                        .catch((error) => console.log(error));
                    }
                }}
                />

                <Text style={styles.label}>Data Fim</Text>
                <TextInput
                style={styles.input}
                placeholder="Selecione a Data Fim"
                value={dataFim}
                onFocus={() => {
                    if (Platform.OS === 'android') {
                    DatePickerAndroid.open({ date: new Date() })
                        .then((res) => handleDataFimChange(null, res.date))
                        .catch((error) => console.log(error));
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


export default AdicionarExposicao;
