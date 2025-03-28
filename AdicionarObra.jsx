import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; 
import {styles} from './styles';


const AdicionarObra = ({ navigation }) => {

    const [titulo, setTitulo] = useState('');
    const [ano, setAno] = useState('');
    const [descricao, setDescricao] = useState('');
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
  

    const adicionarPost = async () => {
        const postData = {
        title: titulo,
        content: descricao,
        status: 'publish',
        fields: {
            titulo,
            ano,
            descricao,
            imagens
        },
        tags: ['obra'],
        };

        try {
        const response = await fetch('https://seusite.com.br/wp-json/wp/v2/posts', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer SEU_TOKEN_JWT_AQUI',
            },
            body: JSON.stringify(postData),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Obra adicionado com sucesso!', data);
            alert('Obra adicionada!');
            navigation.goBack();
        } else {
            console.log('Erro ao adicionar o post:', data);
            alert('Erro ao adicionar a obra');
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

        <Text style={styles.title}>Adicionar Obra</Text>

        <View style={styles.form}>
            <TextInput
            style={styles.input}
            placeholder="Título:"
            value={titulo}
            onChangeText={setTitulo}
            />
            <TextInput
            style={styles.input}
            placeholder="Ano:"
            value={ano}
            onChangeText={setAno}
            />
            <TextInput
            style={styles.input}
            placeholder="Descrição:"
            value={descricao}
            onChangeText={setDescricao}
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


export default AdicionarObra;
