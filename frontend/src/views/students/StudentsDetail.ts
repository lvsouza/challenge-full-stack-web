import Vue from "vue"
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import { required, email, regex, max } from 'vee-validate/dist/rules'
import Component from 'vue-class-component'

import { StudentsDataSource } from '@/services/data-source'

@Component({
    components: {
        ValidationProvider,
        ValidationObserver,
    }
})
export default class StudentsDetail extends Vue {
    email = ""
    name = ""
    cpf = ""
    ra = ""

    constructor() {
        super()

        setInteractionMode('eager')

        extend('required', {
            ...required,
            message: '{_field_} não pode estar vazio!',
        })

        extend('max', {
            ...max,
            message: '{_field_} não pode ser maior que {length} caracteres',
        })

        extend('email', {
            ...email,
            message: 'Email precisa ser válido',
        })

        extend('regex', {
            ...regex,
            message: 'Cpf precisa ser válido',
        })
    }

    mounted() {
        if (this.$route.params.id !== '0') {
            StudentsDataSource.getById(Number(this.$route.params.id))
                .then(({ error, result }) => {
                    if (error && !result) {
                        alert(error)
                    } else {
                        this.ra = (result?.ra || '').toString()
                        this.email = result?.email || ''
                        this.name = result?.name || ''
                        this.cpf = result?.cpf || ''
                    }
                })
                .catch(e => {
                    alert(e)
                })
        }
    }

    async submit() {

        const isFormValid = await (this.$refs.observer as any).validate();
        if (!isFormValid) return;

        if (this.$route.params.id !== '0') {
            StudentsDataSource.update(Number(this.$route.params.id), { email: this.email, name: this.name })
                .then(({ error }) => {
                    if (error) {
                        alert(error)
                    } else {
                        alert('Aluno atualizado!')
                    }
                })
                .catch(e => {
                    alert(e)
                })
        } else {
            StudentsDataSource.create({ email: this.email, name: this.name, cpf: this.cpf, ra: Number(this.ra) })
                .then(({ error, result }) => {
                    if (error || !result?.id) {
                        alert(error)
                    } else {
                        alert('Aluno cadastrado!')
                        this.$router.push('/alunos/' + result.id)
                    }
                })
                .catch(e => {
                    alert(e)
                })
        }
    }
}
