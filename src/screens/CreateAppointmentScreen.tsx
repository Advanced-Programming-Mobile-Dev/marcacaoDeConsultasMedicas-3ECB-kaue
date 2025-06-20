import React from 'react';
import styled from 'styled-components/native';
import {HeaderContainer, HeaderTitle} from '../components/Header';
import AppointmentForm from '../components/AppointmentForm';
import theme from '../styles/theme';
// @ts-ignore
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Appointment} from '../types';
import {RootStackParamList} from '../types';

type CreateAppointmentScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'CreateAppointment'>;
};

const CreateAppointmentScreen: React.FC<CreateAppointmentScreenProps> = ({navigation}) => {
    const handleSubmit = async (appointment: {
        doctorId: string;
        date: Date;
        time: string;
        description: string;
    }) => {
        try {
            const existingAppointments = await AsyncStorage.getItem('appointments');
            const appointments = existingAppointments ? JSON.parse(existingAppointments) : [];

            const newAppointment = {
                id: Date.now().toString(),
                ...appointment,
                status: 'pending',
            };

            appointments.push(newAppointment);

            await AsyncStorage.setItem('appointments', JSON.stringify(appointments));

            navigation.navigate('Home');
        } catch (error) {
            console.error('Erro ao salvar consulta:', error);
            alert('Erro ao salvar a consulta. Tente novamente.');
        }
    };

    return (
        <Container>
            <HeaderContainer>
                <HeaderTitle>Agendar Consulta</HeaderTitle>
            </HeaderContainer>

            <Content>
                <AppointmentForm onSubmit={handleSubmit}/>
            </Content>
        </Container>
    );
};

const Container = styled.View`
    flex: 1;
    background-color: ${theme.colors.background};
`;

const Content = styled.ScrollView`
    flex: 1;
`;

export default CreateAppointmentScreen;