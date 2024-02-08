import { client } from "./api-client";

/**
 * Récupère la liste des assurances
 * @param array params
 */
const commande = async ({ ref }) => {
  return await client("voyage", "post", { ref });
};

export { commande };
