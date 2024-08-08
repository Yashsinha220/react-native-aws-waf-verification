import React, { Component } from 'react';
import {
    View, StyleSheet, Dimensions
} from 'react-native';
import Modal from 'react-native-modal';
import AwfWafCaptcha from './AwfWafCaptchaIntegration';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');

class ConfirmAwfWafCaptcha extends Component {
    state = {
        show: false
    }
    show = () => {
        this.setState({ show: true });
    }
    hide = () => {
        this.setState({ show: false });
    }
    render() {
        let { show } = this.state;
        let { sdkurl, onSuccess, onError } = this.props;
        return (
            <Modal
                useNativeDriver
                hideModalContentWhileAnimating
                deviceHeight={height}
                deviceWidth={width}
                style={styles.modal}
                animationIn="fadeIn"
                animationOut='fadeOut'
                isVisible={show}>
                <View style={styles.wrapper}>
                    <AwfWafCaptcha
                        sdkurl={sdkurl}
                        onSuccess={onSuccess}
                        onError={onError}
                    />
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    text: { fontSize: 15, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginTop: 10 },
    modal: { margin: 0 },
    wrapper: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent: 'center', overflow: 'hidden' }
});
ConfirmGoogleCaptcha.propTypes = {
    sdkurl: PropTypes.string.isRequired,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
}
export default ConfirmAwfWafCaptcha;