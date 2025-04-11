"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const token = process.env.TELEGRAM_BOT_TOKEN || '7759081669:AAHVDXM7M1VsHirrDT6GLTFII-gYkxJ4NJ0';
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
// Store user preferences
const userPreferences = {};
// Handle /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome to NFT Ticketing Hub Bot! 🎫\n\n' +
        'Available commands:\n' +
        '/events - View upcoming events\n' +
        '/tickets - View your tickets\n' +
        '/marketplace - Browse ticket marketplace\n' +
        '/help - Show help message');
});
// Handle /events command
bot.onText(/\/events/, async (msg) => {
    const chatId = msg.chat.id;
    // In a real implementation, fetch events from your API
    const events = [
        { name: 'Summer Music Festival 2024', date: '2024-07-15', location: 'Central Park, New York' },
        { name: 'Tech Conference 2024', date: '2024-09-20', location: 'Convention Center, San Francisco' }
    ];
    const message = events.map(event => `🎫 ${event.name}\n📅 ${event.date}\n📍 ${event.location}\n`).join('\n');
    bot.sendMessage(chatId, 'Upcoming Events:\n\n' + message);
});
// Handle /tickets command
bot.onText(/\/tickets/, async (msg) => {
    const chatId = msg.chat.id;
    // In a real implementation, fetch user's tickets from your API
    const tickets = [
        { name: 'Summer Music Festival 2024', status: 'Active', date: '2024-07-15' },
        { name: 'Tech Conference 2024', status: 'Active', date: '2024-09-20' }
    ];
    const message = tickets.map(ticket => `🎟️ ${ticket.name}\n📅 ${ticket.date}\n✅ ${ticket.status}\n`).join('\n');
    bot.sendMessage(chatId, 'Your Tickets:\n\n' + message);
});
// Handle /marketplace command
bot.onText(/\/marketplace/, async (msg) => {
    const chatId = msg.chat.id;
    // In a real implementation, fetch marketplace data from your API
    const marketplaceItems = [
        { name: 'Summer Music Festival 2024', price: '$150', available: '50 tickets' },
        { name: 'Tech Conference 2024', price: '$200', available: '30 tickets' }
    ];
    const message = marketplaceItems.map(item => `🎫 ${item.name}\n💰 ${item.price}\n📊 ${item.available}\n`).join('\n');
    bot.sendMessage(chatId, 'Ticket Marketplace:\n\n' + message);
});
// Handle /help command
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '🤖 NFT Ticketing Hub Bot Help\n\n' +
        'Commands:\n' +
        '/start - Start the bot\n' +
        '/events - View upcoming events\n' +
        '/tickets - View your tickets\n' +
        '/marketplace - Browse ticket marketplace\n' +
        '/help - Show this help message\n\n' +
        'Need more help? Contact support at support@nftticketinghub.com');
});
// Error handling
bot.on('polling_error', (error) => {
    console.log('Polling error:', error);
});
exports.default = bot;
