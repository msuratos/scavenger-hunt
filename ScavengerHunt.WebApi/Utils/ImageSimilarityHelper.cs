namespace ScavengerHunt.WebApi.Utils
{
    public class ImageSimilarityHelper
    {
        // Jaccard similarity between two sets
        public static double JaccardSimilarity(IEnumerable<string> set1, IEnumerable<string> set2)
        {
            var hash1 = new HashSet<string>(set1);
            var hash2 = new HashSet<string>(set2);
            var intersection = hash1.Intersect(hash2).Count();
            var union = hash1.Union(hash2).Count();
            return union == 0 ? 0 : (double)intersection / union;
        }

        public static double ComputeSimilarity(AzureImageAnalysisResult img1, AzureImageAnalysisResult img2)
        {
            var tagSim = JaccardSimilarity(img1.Tags, img2.Tags);
            var objSim = JaccardSimilarity(img1.Objects, img2.Objects);
            var peopleSim = img1.People.Any() && img2.People.Any() ? 1.0 : 0.0; // crude people similarity

            // Weighted sum (adjust weights as needed)
            return 0.45 * tagSim + 0.45 * objSim + 0.1 * peopleSim;
        }
    }
}
