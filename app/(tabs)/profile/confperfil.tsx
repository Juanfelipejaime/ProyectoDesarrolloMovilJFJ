import { View, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AvatarPicker from '@/components/avatarpicker';
import { Button, TextInput } from 'react-native-paper';
import { AuthContext } from '@/context/authContext/AuthContext';
import { router } from 'expo-router';
import CustomModal from '@/components/CustomModal';
import { ModalProps } from '@/interface/postInterface';
import { LinearGradient } from 'expo-linear-gradient';

export default function configurar() {
  const {
    state: { user },
    updateUser,
  } = useContext(AuthContext);
  const [modal, setModal] = useState({ visible: false } as ModalProps);
  const [toUpdate, setToUpdate] = useState({
    username: user.username,
    name: user.name ?? '',
    photo: user.photo ?? '',
  });

  useEffect(() => {
    console.log({ photo: toUpdate.photo });
  }, [toUpdate.photo]);

  const handleUpdate = async () => {
    setModal({
      visible: true,
      type: 'loading',
      title: 'Actualizando usuario',
      textBody: 'Espera un momento...',
    });
    try {
      const response = await updateUser(toUpdate);
      if (response) {
        setModal({
          visible: false,
        });
        router.back();
      } else {
        setModal({
          visible: true,
          type: 'error',
          title: 'Hubo un error ingresando',
          textBody: 'Vuelve a intentarlo...',
        });
        console.log('Hubo un error ingresando');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LinearGradient colors={['#372C49', '#5E4688']} style={{ flex: 1 }}>
      <View style={{ flex: 1, margin: 20, gap: 10 }}>
        <AvatarPicker
          photo={toUpdate.photo}
          onChange={(photo) => setToUpdate((prev) => ({ ...prev, photo }))}
        />
        <TextInput
          label="Username"
          placeholder="Ingresar tu nuevo username"
          value={toUpdate.username}
          onChangeText={(text) =>
            setToUpdate((prev) => ({ ...prev, username: text }))
          }
          mode="outlined"
          outlineColor="#E4E4E7"
          theme={{
            colors: {
              background: 'white', // Fondo blanco para contraste
              text: 'black', // Texto oscuro dentro del input
              placeholder: '#999', // Placeholder con tono gris
            },
          }}
        />
        <Button
          mode="contained"
          onPress={handleUpdate}
          style={{
            backgroundColor: '#5E4688', // Fondo morado
            borderRadius: 8,
          }}
          labelStyle={{
            color: 'white', // Texto blanco
          }}
        >
          Actualizar
        </Button>
        <CustomModal {...modal} />
      </View>
    </LinearGradient>
  );
}
