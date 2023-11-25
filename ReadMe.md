# Telegram Bot - using `telegraf`

The project is using the [telegraf.js.org](https://telegraf.js.org/) library to implement a telegram bot.

## Installation

To install the project, follow these steps:

1. Clone the repository:
2. Navigate to the project directory:
3. Install the dependencies: `npm install`

## Usage

<small> Assumed that you're in the project directory when running terminal commands</small>

### `.env` file

- Use `env.example` as example to create `.env` file at project root (same place as `package.json`)

```sh
cat ./env.example > .env
```

To run the project, use the following command:

```sh
npm start
```

## Questions

- [x] Does port selection doesn't matter for telegram bot?

Actually no, coz telegram has something called - `MTProto encryption protocol`. From my understanding, it's a secure https path for bot-and-code to communicate - the protocol somehow ensures that both of them can communicate with each other (the code and the bot).

GitHub Copilot: **_MTProto_** is the encryption protocol that is used in the Telegram messaging application. It stands for "Mobile Telegram Protocol".

Here's a simplified explanation:

1. **Cloud-based**: MTProto is designed to work well on mobile devices. It allows users to seamlessly switch between devices, keeps messages in sync across devices, and stores messages in the cloud so they can be accessed anytime.

2. **End-to-End Encryption**: In addition to server-client encryption, MTProto supports end-to-end encryption for secret chats. This means that only the sender and receiver can read the messages. Even Telegram cannot decipher the content of the messages.

3. **Speed and Security**: MTProto is designed to be fast and secure. It uses a combination of 256-bit symmetric AES encryption, 2048-bit RSA encryption, and Diffie–Hellman secure key exchange.

4. **Verification**: To ensure the integrity and authenticity of the data, MTProto uses SHA-256 for hash computations.

Remember, while MTProto is designed to be secure, no protocol can guarantee complete security. It's important to keep your software up to date and be aware of potential threats.

---

## Troubleshooting

### telegram-API blocked

- at one point I couldn't get the telegram bot to work, and I spend whole day trying all sorts of codes - trying to make a bare minimum app just to get telegram bot working,
- **turned out - the wifi I was using - it was blocking API calls to telegram and there was nothing wrong with my code**
- after spending whole day trying to doubt my existence as a coder

> ❓ HOW to check if APIs are being blocked?

```sh
#inside terminal, run this command
ping api.telegram.org
# use `Ctrl+C` to exit-kill ping command (`CMD+C` for MAC)
```

```sh
# If API are being blocked you'll see these lines consistently
~ % ping api.telegram.org
PING api.telegram.org (149.154.167.220): 56 data bytes
Request timeout for icmp_seq 0
Request timeout for icmp_seq 1
Request timeout for icmp_seq 2
```

```sh
# If API are working fine
~ % ping api.telegram.org
PING api.telegram.org (149.154.167.220): 56 data bytes
64 bytes from 149.154.167.220: icmp_seq=0 ttl=48 time=227.537 ms
64 bytes from 149.154.167.220: icmp_seq=1 ttl=48 time=269.441 ms
64 bytes from 149.154.167.220: icmp_seq=2 ttl=48 time=131.524 ms

^C
--- api.telegram.org ping statistics ---
7 packets transmitted, 7 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 109.779/159.774/269.441/58.074 ms
```
