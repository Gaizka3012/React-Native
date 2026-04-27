import { Component } from 'react';
import { ScrollView, View, StyleSheet, ImageBackground } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';

function RenderItem(props) {

  const item = props.item;

  if (props.isLoading) {
    return (
      <IndicadorActividad />
    );
  } 

  else if (props.errMess) {
    return (
      <View>
        <Text>{props.errMess}</Text>
      </View>
    );
  }
  else {
    if (item != null) {
      return (
        <Card style={styles.card}>
          <ImageBackground
            source={{ uri: baseUrl + item.imagen }}
            style={styles.image}
          >
            <Text style={styles.tituloImagen}>
              {item.nombre}
            </Text>
          </ImageBackground>

          <Card.Content>
            <Text style={styles.descripcion}>
              {item.descripcion}
            </Text>
          </Card.Content>
        </Card>
      );
    }
    else {
      return (<View></View>);
    }
  }
}

class Home extends Component {


  render() {
    return (
      <ScrollView>
        <RenderItem item={this.props.cabeceras.cabeceras.filter((item) => item.destacado)[0]} />
        <RenderItem
          item={this.props.excursiones.excursiones.filter((item) => item.destacado)[0]}
          isLoading={this.props.excursiones.isLoading}
          errMess={this.props.excursiones.errMess}
        />
        <RenderItem item={this.props.actividades.actividades.filter((item) => item.destacado)[0]} />
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  image: {
    height: 200,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20
  },
  tituloImagen: {
    color: 'chocolate',
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold'
  },
  descripcion: {
    marginTop: 20,
    marginBottom: 20,
  },
});

const mapStateToProps = (state) => ({
  excursiones: state.excursiones,
  cabeceras: state.cabeceras,
  actividades: state.actividades,
});

export default connect(mapStateToProps)(Home);