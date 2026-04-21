import { Component } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';

function RenderExcursion(props) {
  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card style={styles.card}>

        <ImageBackground
          source={{ uri: baseUrl + excursion.imagen }}
          style={styles.image}
        >
          <Text style={styles.tituloImagen}>
            {excursion.nombre}
          </Text>
        </ImageBackground>

        <Card.Content>
          <Text style={styles.descripcion}>
            {excursion.descripcion}
          </Text>
        </Card.Content>

        <View style={styles.iconoContainer}>
          <IconButton
            icon={props.favorita ? 'heart' : 'heart-outline'}
            size={28}
            onPress={() =>
              props.favorita
                ? console.log('Ya es favorita')
                : props.onPress()
            }
          />
        </View>

      </Card>
    );
  } else {
    return <View />;
  }
}

function RenderComentario(props) {
  const comentarios = props.comentarios;

  return (
    <Card style={styles.card}>
      <Card.Title title="Comentarios" />

      <Card.Content>
        {comentarios.map((comentario) => (
          <View key={comentario.id}>
            <Text>{comentario.comentario}</Text>
            <Text>Valoración: {comentario.valoracion} Estrellas</Text>
            <Text>
              {comentario.autor} - {new Date(comentario.dia).toLocaleDateString()}
            </Text>
          </View>
        ))}
      </Card.Content>

    </Card>
  );
}

class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritos: []
    };
  }
  marcarFavorito(excursionId) {
    this.setState({
      favoritos: this.state.favoritos.concat(excursionId)
    });
  }

  render() {
    const { excursionId } = this.props.route.params;

    return (
      <ScrollView>

        <RenderExcursion
          excursion={this.props.excursiones.excursiones[+excursionId]}
          favorita={this.state.favoritos.some(el => el === excursionId)}
          onPress={() => this.marcarFavorito(excursionId)}
        />

        <RenderComentario
          comentarios={this.props.comentarios.comentarios.filter(
            (comentario) => comentario.excursionId === excursionId
          )}
        />

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
    color: 'white',
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold'
  },
  descripcion: {
    marginTop: 20,
    marginBottom: 20,
  },
  iconoContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
});

const mapStateToProps = (state) => ({
  excursiones: state.excursiones,
  comentarios: state.comentarios,
});

export default connect(mapStateToProps)(DetalleExcursion);

