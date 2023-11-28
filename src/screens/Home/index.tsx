import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, FlatList, Alert } from "react-native";
import { styles } from "./styles";
import { Participant } from '../componets/Participant';


export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantsName] = useState('');

    function handleparticipantAdd() {
      if(!participantName.trim()){
        return Alert.alert("Erro", "Digite um nome."),
      }
      if (participants.includes(participantName)){
        return Alert.alert('Participante Existe', 'Ja existe um participante na lista');

      }

        
      setParticipants(prevState =>[...prevState, participantName ]);
      setParticipantsName('');
    }

    function handleParticipantRemove(name: string) {
      Alert.alert('Remover', `Remover o participante ${name}?`, [
        {
          text:'Sim',
          onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name ))
        },
        {
          text:'Não',
          style: 'cancel'
    }
  ] );
    
        console.log(`vc clicou deletar ${name}` );
      
    }


  return (

    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do Evento
      </Text>

      <Text style={styles.eventDate}>
        Sexta, 4 de Novembro de 2022.
      </Text>

      <View style={styles.form}>

        <TextInput 
            style={styles.input}
            placeholder="Nome do participante"
            placeholderTextColor={"#6B6B6B"}
            onChangeText={setParticipantsName}
            value={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleparticipantAdd}>
            <Text style={styles.buttonText}>
             +
             </Text>
         </TouchableOpacity>

      </View>
      
      <FlatList 
        data={participants}
        keyExtractor={item => item }
        renderItem={({ item }) => (
          <Participant
           key={ item }
           name={ item }
           onRemove={() => handleParticipantRemove(item) }
           />
       )}
       showsVerticalScrollIndicator={false}
       ListEmptyComponent={() => (
        <Text style={styles.listEmptyText}>
          Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
        </Text>
      )}
      />
      
    </View>
  )
}