import { View, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { Avatar, Button, Text } from 'react-native-paper';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '@/context/authContext/AuthContext';
import AvatarView from '@/components/avatarView';

export default function Profile() {
    const { state: { user } } = useContext(AuthContext);

    const TextInfo = ({ title, number }: any) => (
        <View style={styles.textInfoContainer}>
            <Text style={styles.textNumber}>{number}</Text>
            <Text style={styles.textTitle}>{title}</Text>
        </View>
    );

    return (
        <LinearGradient
            colors={['#372C49', '#5E4688']}
            style={styles.gradient}
        >
            <View style={styles.container}>
                <View style={styles.userInfo}>
                    {user.photo && user.photo !== "" ? (
                        <AvatarView size={100} photo={user.photo} />
                    ) : (
                        <Avatar.Text label={user.uid} size={100} />
                    )}
                    <TextInfo title="Juegos" number={user.juegos} />
                </View>

                <View style={styles.profileDetails}>
                    <Text style={styles.username}>{user.username}</Text>
                    <Text style={styles.name}>{user.name ?? ""}</Text>

                    <View style={styles.textDescriptionContainer}>
                        <Text style={styles.textDescription}>
                            Bienvenido a tu perfil.
                        </Text>
                    </View>

                    <View style={styles.buttonRow}>
                        <Link href={"/(tabs)/profile/confperfil"} asChild>
                            <Button mode="contained" style={styles.button}>
                                Editar perfil
                            </Button>
                        </Link>
                    </View>
                </View>

                <View style={{ flex: 1 }} />
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        margin: 20,
    },
    userInfo: {
        flexDirection: 'row',
        gap: 25,
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: 20,
    },
    textInfoContainer: {
        flexDirection: 'column',
        gap: 5,
        alignItems: 'center',
        alignContent: 'center',
    },
    textNumber: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFD700', // Dorado para resaltar números
    },
    textTitle: {
        fontWeight: '400',
        fontSize: 14,
        color: '#FFFFFF',
    },
    profileDetails: {
        gap: 10,
        marginVertical: 25,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 20,
        letterSpacing: 1,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 5,
    },
    name: {
        fontSize: 16,
        fontWeight: '300',
        color: '#B0B0B0',
        textAlign: 'center',
    },
    textDescriptionContainer: {
        marginVertical: 15,
        paddingHorizontal: 10,
    },
    textDescription: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        textAlign: 'center',
        color: '#D3D3D3',
    },
    buttonRow: {
        flexDirection: 'row',
        marginVertical: 10,
        gap: 10,
    },
    button: {
        flex: 1,
        backgroundColor: '#9888C1',
    },
});
