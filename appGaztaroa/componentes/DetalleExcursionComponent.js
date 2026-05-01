import { Component } from 'react';
import { View, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { Card, Text, IconButton, Portal, Modal, TextInput, Button } from 'react-native-paper';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { postFavorito, postComentario } from '../redux/ActionCreators';

const mapDispatchToProps = dispatch => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
  postComentario: (excursionId, valoracion, autor, comentario) =>
    dispatch(postComentario(excursionId, valoracion, autor, comentario))
});

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
          <IconButton
            icon="pencil"
            size={28}
            onPress={props.abrirModal}
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
      valoracion: 5,
      autor: '',
      comentario: '',
      showModal: false
    };
  }
  marcarFavorito(excursionId) {
    this.props.postFavorito(excursionId);
  }
  gestionarComentario(excursionId) {
    this.props.postComentario(
      excursionId,
      this.state.valoracion,
      this.state.autor,
      this.state.comentario
    );
    this.resetForm();
  }
  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }
  resetForm() {
    this.setState({
      valoracion: 5,
      autor: '',
      comentario: '',
      showModal: false
    });
  }
  render() {
    const { excursionId } = this.props.route.params;

    return (
      <View style={styles.container}>
        <Portal>
          <Modal
            visible={this.state.showModal}
            onDismiss={() => this.toggleModal()}
            contentContainerStyle={styles.modalContainer}
          >

          <Text variant="headlineSmall" style={styles.modalTitle}>Añadir comentario</Text>

          <View style={styles.valoracionContainer}>
            {[1, 2, 3, 4, 5].map((num) => (
              <IconButton
                key={num}
                icon={num <= this.state.valoracion ? 'star' : 'star-outline'}
                iconColor={num <= this.state.valoracion ? '#f4c430' : undefined}
                onPress={() => this.setState({ valoracion: num })}
              />
            ))}
          </View>

          <TextInput
            label="Autor"
            value={this.state.autor}
            onChangeText={(text) => this.setState({ autor: text })}
            style={styles.formInput}
          />

          <TextInput
            label="Comentario"
            value={this.state.comentario}
            onChangeText={(text) => this.setState({ comentario: text })}
            style={styles.formInput}
          />

          <View style={styles.modalActions}>
            <Button onPress={() => this.resetForm()}>
              Cancelar
            </Button>

            <Button mode="contained" onPress={() => this.gestionarComentario(excursionId)}>
              Enviar
            </Button>
          </View>

          </Modal>
        </Portal>

        <ScrollView>
          <RenderExcursion
            excursion={this.props.excursiones.excursiones[+excursionId]}
            favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
            onPress={() => this.marcarFavorito(excursionId)}
            abrirModal={() => this.toggleModal()}
          />

          <RenderComentario
            comentarios={this.props.comentarios.comentarios.filter(
              (comentario) => comentario.excursionId === excursionId
            )}
          />

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalContainer: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
  },
  modalTitle: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  valoracionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  formInput: {
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const mapStateToProps = (state) => ({
  excursiones: state.excursiones,
  comentarios: state.comentarios,
  favoritos: state.favoritos
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);

