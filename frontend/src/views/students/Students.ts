import Vue from "vue"
import Component from "vue-class-component"

import { GetStudent, IStudent } from '@/services/data-source/'

@Component
export default class StudentsPage extends Vue {
    deleteId: string = '0'
    students: IStudent[] = []
    dialogDelete = false

    headers = [
        { text: "Registro acadêmico", value: "ra" },
        { text: "Nome", value: "name" },
        { text: "CPF", value: "cpf" },
        { text: "Ações", value: "actions", sortable: false },
    ]

    mounted() {
        GetStudent.getAll()
            .then(({ error, result }) => {
                if (error && !result) {
                    alert(error)
                } else {
                    this.students = result || []
                }
            })
            .catch(e => {
                alert(e)
            })
    }

    edit(id: string) {
        this.$router.push('/alunos/' + id)
    }

    deleting(id: string) {
        this.deleteId = id
        this.dialogDelete = true
    }

    deleteItemConfirm() {
        this.dialogDelete = false
        console.log(this.deleteId)
        GetStudent.delete(Number(this.deleteId))
            .then(({ error }) => {
                if (error) {
                    alert(error)
                } else {
                    this.students = [...this.students.filter(std => Number(std.id) !== Number(this.deleteId))]
                }
            })
            .catch(e => {
                alert(e)
            })
    }
}