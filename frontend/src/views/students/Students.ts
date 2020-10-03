import Vue from "vue"
import Component from "vue-class-component"

import { StudentsDataSource, IStudent } from '@/services/data-source/'

@Component
export default class StudentsPage extends Vue {
    students: IStudent[] = []
    deleteId: string = '0'
    dialogDelete = false
    searchText = ''

    headers = [
        { text: "Registro acadêmico", value: "ra" },
        { text: "Nome", value: "name" },
        { text: "CPF", value: "cpf" },
        { text: "Ações", value: "actions", sortable: false },
    ]

    mounted() {
        StudentsDataSource.getAll()
            .then(({ error, result }) => {
                if (error && !result) {
                    alert(error)
                } else {
                    this.students = result || []
                }
            })
            .catch(e => {
                alert(e)
                this.$router.back()
            })
    }

    get seachedStudents() {
        return this.students.filter(student => {
            if (String(student.ra).toLowerCase().includes(this.searchText.toLowerCase())) return true;
            else if (student.cpf.toLowerCase().includes(this.searchText.toLowerCase())) return true;
            else if (student.name.toLowerCase().includes(this.searchText.toLowerCase())) return true;
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
        StudentsDataSource.delete(Number(this.deleteId))
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