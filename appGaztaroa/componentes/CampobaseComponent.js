import React, { Component } from 'react';
import Calendario from './CalendarioComponent';
import { EXCURSIONES } from '../comun/excursiones';
import DetalleExcursion from './DetalleExcursionComponent';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

class Campobase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            excursiones: EXCURSIONES,
            seleccionExcursion: null
        };
    }
    onSeleccionExcursion(excursionId) {
        this.setState({ seleccionExcursion: excursionId })
    }
    render() {

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <DetalleExcursion excursion={this.state.excursiones.filter((excursion) => excursion.id === this.state.seleccionExcursion)[0]} />
                <Calendario excursiones={this.state.excursiones} onPress={(excursionId) => this.onSeleccionExcursion(excursionId)} />
            </SafeAreaView>
        );
    }
}
export default Campobase; 
