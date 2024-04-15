import React, {useState,useEffect}  from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Modal, Button,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Treinos } from './treinos';

export function Home(props:any){
    const [inserirDesc, setInserirDesc] = useState<string>('');
    const [inserirLetra, setInserirLetra] = useState<string>('');
    const [abrirModal , setAbrirModal ] = useState<boolean>(false);
    const [dados, setDados] = useState<any[]>([]);

    useEffect(() =>  {
        obterDadosSalvos();
     } ,[])
    
    const handlerAdicionarRotina = () => {
        if(inserirDesc && inserirLetra){
            const newData = [{id :Date.now().toString(), indice : inserirLetra, desc : inserirDesc}, ...dados]
            setInserirDesc(''); 
            console.log(newData);
            setInserirLetra('');
            setDados(newData);
            SaveData(newData);
            handlerFecharModal();
        }
    }
    const handlerFecharModal = () => {
        if (abrirModal == true){
            setAbrirModal(false);
        } else if(abrirModal == false){
            setAbrirModal(true)
        }

    }
    const obterDadosSalvos = async() => {
        try {
            const key = 'Rotina';
            const dadosStringJson = await AsyncStorage.getItem(key);
            if(dadosStringJson){
                const dadosColetados = JSON.parse(dadosStringJson);
                setDados(dadosColetados);

            }
        } catch (error) {
            
        }
    }
    const SaveData = async(item:any) =>{
      

        setDados(item);
        try {
            const key = 'Rotina';
            const dadosJsonString = JSON.stringify(item);
            await AsyncStorage.setItem(key,dadosJsonString);
        } catch (error) {
            console.error('Não foi possível salvar os dados, gostoso!');
        }
    }

    

    return (
        <View style={styles.container}>
            <FlatList
                data={dados}
                keyExtractor = {(item)=>item.id}
                renderItem={({item})=>(
                <TouchableOpacity onPress={() => props.navigation.navigate('Treinos',{id: item.desc})}>
                    <View style = {{flexDirection : 'row'}}>
                        <Text> {item.indice} </Text>
                        <Text> {item.desc}</Text>
                    </View>
                </TouchableOpacity>
                
                )}
            />
          <Modal visible = {abrirModal}>
            <View style = {{flex : 1, justifyContent : 'center', backgroundColor : 'pink'}}>
                <TextInput placeholder='InserirLetra'onChangeText={(text)=> setInserirLetra(text)} value={inserirLetra} maxLength={1}/>
                <TextInput placeholder='InserirTexto'onChangeText={(text)=> setInserirDesc(text)} value={inserirDesc} maxLength={15}/>
                <View style = {{flexDirection: 'row'}}>
                   
                    <Button title = 'Fechar'onPress = {handlerFecharModal} />
                    <Button title = 'Salvar'onPress = {handlerAdicionarRotina} />


                </View>
            </View>
          </Modal>
          <Button title='Adicionar Rotina' onPress={handlerFecharModal} />
        </View>
    );
}
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#f0f0f0',
        },
        itemContainer: {
            backgroundColor: '#008',
            padding: 16,
            alignItems: 'flex-start',
            marginVertical: 10,
            marginHorizontal: 16,
        },
        treino: {
            fontSize: 30,
            color: '#FFF',
        },
    });
    

