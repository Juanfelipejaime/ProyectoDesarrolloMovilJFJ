import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Necesitarás instalar expo-linear-gradient

const Chat = () => {
  const [messages, setMessages] = useState([]); // Mensajes enviados y recibidos
  const [currentMessage, setCurrentMessage] = useState(''); // Mensaje actual

  const sendMessage = async () => {
    if (currentMessage.trim() === '') return;
    //envio
    const userMessage = { user: 'U', message: currentMessage };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const payload = {
      contents: [
        {
          parts: [{ text: currentMessage }],
        },
      ],
    };

    // API
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyA-8dfdJPQ69RZhDFHgi0cqhFek7oLn6LE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const data = await response.json();
      //Respuesta
      const botReplyText = data.candidates[0]?.content?.parts[0]?.text?.trim() || 'Sin respuesta';
      const botReply = { user: 'G', message: botReplyText };

      setMessages((prevMessages) => [...prevMessages, botReply]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: 'Error', message: 'No se pudo enviar el mensaje.' },
      ]);
    } finally {
      setCurrentMessage('');
    }
  };

  return (
    <LinearGradient
      colors={['#372C49', '#5E4688']}
      style={styles.gradient}
    >
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.user}>{item.user}:</Text>
            <Text style={styles.message}>{item.message}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={currentMessage}
          onChangeText={setCurrentMessage}
          placeholder="Escribe un mensaje..."
          placeholderTextColor="#ccc"
        />
        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    padding: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#e6e6e6',
    borderRadius: 5,
  },
  user: { fontWeight: 'bold', marginRight: 5 },
  message: { flexShrink: 1 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#9888C1',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Chat;