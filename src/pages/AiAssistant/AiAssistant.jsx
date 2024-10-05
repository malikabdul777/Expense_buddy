// React
import { useEffect, useRef, useState } from "react";

// Thirdparty
import { FaArrowRight } from "react-icons/fa6";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";

// Utils

// APISlices
import { usePostChatMutation } from "@/store/apiSlices/childApiSlices/chatSlice";

// Slice

// CustomHooks

// Components
import { Button } from "@/components/ui/button";

// Constants

// Enums

// Interfaces

// Styles
import styles from "./AiAssistant.module.css";
import "./AiAssistant.css";
import { useGetAllTransactionsQuery } from "@/store/apiSlices/childApiSlices/transactionsApiSlice";

// Local enums

// Local constants

// Local Interfaces

// You are an AI assistant specializing in personal finance and expense analysis. Your task is to thoroughly analyze the provided JSON data containing a user's expenses from an expense tracking app. Your goal is to identify valuable patterns, trends, and insights that can help the user better understand and optimize their spending habits. In your analysis, please cover the following aspects: Overall Spending Summary: Total income and expenses for the given period Net income/deficit Breakdown of expenses by category (e.g., rent, groceries, transportation) Expense Patterns: Identify recurring expenses (e.g., rent, subscriptions) Highlight any irregular or one-time large expenses Analyze spending trends over time (weekly, monthly) Income Analysis: Identify sources of income (e.g., salary, side income) Assess the stability and consistency of income streams Budget Optimization: Suggest areas where the user can potentially reduce expenses Recommend strategies for better budgeting and expense tracking Savings Opportunities: Identify potential areas for saving or investing based on income and expenses Provide recommendations for building an emergency fund or achieving financial goals Actionable Insights: Summarize your key findings and recommendations Offer specific, actionable steps the user can take to improve their financial situation Please provide a detailed and well-structured analysis, using headings and subheadings as needed. Feel free to include visualizations or charts if they can enhance the clarity of your insights. Here is the JSON data containing the user's expenses:

const AiAssistant = () => {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [isChatActive, setIsChatActive] = useState(false);
  const conversationContainerRef = useRef(null);
  const [isStartConversationLoading, setIsStartConversationLoading] =
    useState(false);

  useEffect(() => {
    // Scroll to the bottom of the conversation container
    if (conversationContainerRef.current) {
      conversationContainerRef.current.scrollTop =
        conversationContainerRef.current.scrollHeight;
    }
  }, [allMessages]); // Trigger scroll effect whenever allMessages changes

  const [postChat] = usePostChatMutation();

  // Fetching Transactions from server
  const { transactionsData } = useGetAllTransactionsQuery();

  const handleStartChat = async () => {
    setIsChatActive(true);

    setIsStartConversationLoading(true);

    const initialMessage = `You are an AI assistant tasked with analyzing user expense data from an expense tracking app. Here is the JSON data containing the user's expenses: ${JSON.stringify(
      transactionsData
    )}. Use only data provide above. Be through about the category data. Start the response with a greeting. Don't say thanks fro providing data. User don't know that this data is being sent to you. Don't mention JSON.Just use data to refer. Properly formate the response using markdown. In a new line ask user for their questions on the data. Never give placeholder. Don't give text like "XXX". Group category in subheadings`;

    try {
      const response = await postChat([
        {
          role: "user",
          content: initialMessage,
        },
      ]);

      setIsStartConversationLoading(false);

      setAllMessages([response.data?.choices[0].message]);
    } catch (error) {
      toast.error("Something went wrong", {
        position: "bottom-center",
      });
    }
  };

  const sendMessage = async () => {
    let messageToSend = [...allMessages, { role: "user", content: message }];

    setAllMessages(messageToSend);
    setMessage("");
    try {
      const response = await postChat(messageToSend);

      setAllMessages([...messageToSend, response.data?.choices[0].message]);
    } catch (error) {
      toast.error("Something went wrong", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <h2 className={styles.heading}>Your personal AI Assistant</h2>
      </div>
      <div className={styles.assistantContainer}>
        {!isChatActive && (
          <div className={styles.startChatContainer}>
            <h3>How can I help you today?</h3>
            <Button
              className={styles.startChatButton}
              onClick={handleStartChat}
            >
              Start Chat
            </Button>
          </div>
        )}
        {isStartConversationLoading && (
          <div className="loader">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        )}
        {isChatActive && (
          <div className={styles.chatContainer}>
            <div
              ref={conversationContainerRef}
              className={styles.conversationContainer}
            >
              {allMessages.length > 0 &&
                allMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`${styles.messageWrapper} ${
                      message?.role === "assistant"
                        ? styles.assistantMessage
                        : styles.userMessage
                    }`}
                  >
                    {/* Render message content */}
                    <ReactMarkdown>{message?.content}</ReactMarkdown>
                  </div>
                ))}
              {allMessages.length > 0 &&
                allMessages[allMessages.length - 1]?.role === "user" && (
                  <div className="loader">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                  </div>
                )}
            </div>
            <div className={styles.chatBox}>
              <input
                type="text"
                placeholder="Type a message"
                className={styles.chatInput}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />
              <div className={styles.sendIconContainer} onClick={sendMessage}>
                <FaArrowRight />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiAssistant;
