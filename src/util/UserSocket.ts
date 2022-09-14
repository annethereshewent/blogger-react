import { createConsumer } from '@rails/actioncable'

const SOCKET_ADDRESS = process.env.REACT_APP_BASE_SOCKET || ''

export class UserSocket {
  cable: ActionCable.Cable
  constructor() {
    this.cable = createConsumer(SOCKET_ADDRESS)
  }

  subscribeToUser(email: string, setConfirmed: (confirmed: boolean) => void) {
    this.cable.subscriptions.create({ channel: 'UsersChannel', email }, {
      received(data) {
        setConfirmed(data.confirmed)
      }
    })
  }
}